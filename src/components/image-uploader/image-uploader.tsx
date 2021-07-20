import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

function ImageUploader(props: { imageUrl?: string, onImageUpload: Function }) {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(props.imageUrl || '');

    function getBase64(img: Blob, callback: Function) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file: any) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        if (isJpgOrPng && isLt2M) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e => {
                if (e) {
                    //file.thumbUrl = e.target!.result;
                    getBase64(file, (imageUrl: string) => {
                        setImageUrl(imageUrl);
                        setLoading(false);
                    });
                };
            }
        }
        return false;
    }

    const handleChange = (info: any) => {
        props.onImageUpload(info.file);
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <Upload
            name="cake-image"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            multiple={false}
        >
            {imageUrl ? <img src={imageUrl} alt="cake" style={{ width: '100%', height: '100%' }} /> : uploadButton}
        </Upload>
    );
}

export default ImageUploader;