import { env } from "process";
import { create } from "zustand";

interface ClodinaryStateProps {
  actions: {
    uploadImage: (image: any) => Promise<void>;
  };
}

const uploadImage = async (image: any) => {
  const formData = new FormData();
  formData.append("upload_preset", "my-uploads");
  for (const file of image) {
    formData.append("file", file);
  }
  const imageData = await fetch(
    `https://api.cloudinary.com/v1_1/dtechnw6l/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  ).then((response) => response.json());
  return imageData.secure_url;
};

export const useClodinaryState = create<ClodinaryStateProps>((set) => ({
  actions: {
    uploadImage: async (image) => await uploadImage(image),
  },
}));
