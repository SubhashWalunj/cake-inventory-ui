import { useState } from 'react';
import { notification } from 'antd';
import { ICakeInterface } from '../../interfaces/cake.interface';
import { Redirect } from 'react-router';
import CakeForm from '../cake-form/cake-form';
import ImageUploadService from '../../services/image-upload.service';
import { IAPIResponse } from '../../interfaces/api-response.interface';
import BackToHome from '../back-to-home/back-to-home';

function NewCake() {
    const [redirectRoute, setRedirectRoute] = useState(<></>);

    const handleOnSubmit = async (cakeImage: File | undefined, cake: ICakeInterface) => {
        if (cakeImage) {
            const uploadedImageUrl: string | null = await ImageUploadService.uploadImage('cakeImage', cakeImage);

            if (uploadedImageUrl) {
                const newCake = { ...cake };
                newCake.imageUrl = uploadedImageUrl;
                try {
                    const addCakeResult = await fetch(`http://localhost:3100/cake/add`, {
                        method: 'POST',
                        body: JSON.stringify({ cake: newCake }),
                        headers: {
                            "content-type": 'application/json'
                        }
                    });
                    const addCakeResultJson: IAPIResponse = await addCakeResult.json();
                    if (addCakeResultJson.ok) {
                        notification['success']({
                            message: 'Success',
                            description: 'A new cake added to inventory.',
                        });
                        setRedirectRoute(<Redirect to='/' />);
                    } else {
                        notification['error']({
                            message: 'Error',
                            description: addCakeResultJson.message,
                        });
                    }
                } catch (e) {
                    notification['error']({
                        message: 'Error',
                        description: 'Error occurred while adding the new cake. Please try again.',
                    });
                }

            } else {
                notification['error']({
                    message: 'Error',
                    description: 'Error occurred while uploading the image. Please try again.',
                });
            }
        }
    };


    return (
        <>
            <BackToHome />
            <CakeForm onFormSubmit={handleOnSubmit} />
            {redirectRoute}
        </>
    );
}

export default NewCake;