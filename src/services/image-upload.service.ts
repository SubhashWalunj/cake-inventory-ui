class ImageUploadService {
    private endpoint: string = 'http://localhost:3100/image-upload';

    public static async uploadImage(name: string, image: File): Promise<string | null> {
        const formData = new FormData();

        formData.append(name, image);

        // upload image 1st
        try {
            const imageUploadResult = await fetch(`http://localhost:3100/image-upload`, {
                method: 'POST',
                body: formData
            });
            const imageUploadJsonResult = await imageUploadResult.json();
            if (Array.isArray(imageUploadJsonResult)) {
                const cakeImgUrl = imageUploadJsonResult[0].url;
                return cakeImgUrl;
            }
            return null;
        } catch (e) {
            return null;
        }
    };
}

export default ImageUploadService;