import React, { useState } from 'react';
import { notification } from 'antd';
import { ICakeInterface } from '../../interfaces/cake.interface';
import { Redirect } from 'react-router';
import { useUpdateCakeContext } from '../../context/cake.context';
import CakeForm from '../cake-form/cake-form';
import ImageUploadService from '../../services/image-upload.service';
import { IAPIResponse } from '../../interfaces/api-response.interface';
import BackToHome from '../back-to-home/back-to-home';

function UpdateCake() {
    const [redirectRoute, setRedirectRoute] = useState(<></>);
    const { cakeToUpdate } = useUpdateCakeContext();

    const handleOnSubmit = async (cakeImage: File | undefined, cake: ICakeInterface) => {
        let uploadedImageUrl: string | null = cakeToUpdate?.imageUrl!;
        if (cakeImage) {
            uploadedImageUrl = await ImageUploadService.uploadImage('cakeImage', cakeImage);
        }

        if (uploadedImageUrl) {
            const newCake = { ...cake };
            newCake.imageUrl = uploadedImageUrl;
            try {
                const updateResult = await fetch(`http://localhost:3100/cake/update`, {
                    method: 'PUT',
                    body: JSON.stringify({ newCakeDetails: newCake }),
                    headers: {
                        "content-type": 'application/json'
                    }
                });
                const updateResultJson: IAPIResponse = await updateResult.json();
                if (updateResultJson.ok) {
                    notification['success']({
                        message: 'Success',
                        description: 'New changes applied to the cake.',
                    });
                } else {
                    notification['error']({
                        message: 'Error',
                        description: updateResultJson.message
                    });
                }
                setRedirectRoute(<Redirect to='/' />);
            } catch (e) {
                notification['error']({
                    message: 'Error',
                    description: 'Error occurred while changing the cake details. Please try again.',
                });
            }

        } else {
            notification['error']({
                message: 'Error',
                description: 'Error occurred while uploading the image. Please try again.',
            });
        }

    };


    return (
        <>
            <BackToHome />
            <CakeForm onFormSubmit={handleOnSubmit} cakeToUpdate={cakeToUpdate!} />
            {redirectRoute}
        </>
    );
}

export default UpdateCake;