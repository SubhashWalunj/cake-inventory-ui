import React, { useState } from 'react';
import { Button, Card, Form, Input, notification, Rate } from 'antd';
import ImageUploader from '../image-uploader/image-uploader';
import { ICakeInterface } from '../../interfaces/cake.interface';

function CakeForm(props: {
    cakeToUpdate?: ICakeInterface,
    onFormSubmit: (cakeImage: File | undefined, cake: ICakeInterface) => void
}) {
    const [cakeImage, setCakeImage] = useState();

    const onFinish = async (values: any) => {
        const cake: ICakeInterface = {
            name: values.cakeName,
            comment: values.comment,
            imageUrl: '',
            yumFactor: values.yumFactor
        };
        if (props.cakeToUpdate) {
            cake.id = props.cakeToUpdate.id
        }
        if (
            cake.name === props.cakeToUpdate?.name &&
            cake.comment === props.cakeToUpdate?.comment &&
            cake.yumFactor === props.cakeToUpdate?.yumFactor &&
            !cakeImage
        ) {
            notification['info']({
                message: 'Info',
                description: 'Please make a change to submit.',
            });
        } else {
            props.onFormSubmit(cakeImage, cake);
        }
    };

    const handleImageUpload = (imageFile: any) => {
        setCakeImage(imageFile);
    };

    const onFinishFailed = (err: any) => {
        console.log(err);
    }

    return (
        <>
            <Card title="Add new cake">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{
                        cakeName: props.cakeToUpdate?.name,
                        comment: props.cakeToUpdate?.comment,
                        yumFactor: props.cakeToUpdate?.yumFactor
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="cakeName"
                        rules={[
                            { required: true, message: 'Please enter the cake name' },
                            { max: 30, message: 'Cake name cannot me greater than 30 characters' }
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Comment"
                        name="comment"
                        rules={[
                            { required: true, message: 'Please enter comment' },
                            { max: 200, message: 'Comment cannot me greater than 200 characters' }
                        ]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="Picture"
                        name="picture"
                    >
                        <ImageUploader onImageUpload={handleImageUpload} imageUrl={props.cakeToUpdate?.imageUrl} />
                    </Form.Item>

                    <Form.Item
                        label="Yum Factor"
                        name="yumFactor"
                        rules={[{ required: true, message: 'Please enter the yum factor' }]}>
                        <Rate />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}

export default CakeForm;