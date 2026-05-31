// Cloudinary Integration Utility
// This file provides utilities for integrating Cloudinary for image storage

export interface CloudinaryUploadResponse {
  public_id: string
  version: number
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  access_mode: string
  original_filename: string
}

export interface CloudinaryUploadOptions {
  file: File
  folder?: string
  transformation?: string
  tags?: string[]
}

export const uploadToCloudinary = async (
  options: CloudinaryUploadOptions
): Promise<CloudinaryUploadResponse> => {
  // This should call your backend API to upload to Cloudinary
  // Example API call:
  // const formData = new FormData()
  // formData.append('file', options.file)
  // formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
  // if (options.folder) formData.append('folder', options.folder)
  // if (options.transformation) formData.append('transformation', options.transformation)
  // if (options.tags) formData.append('tags', options.tags.join(','))
  
  // const response = await fetch(
  //   `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  //   {
  //     method: 'POST',
  //     body: formData
  //   }
  // )
  // const data = await response.json()
  // return data

  console.log('Upload to Cloudinary:', options)
  throw new Error('Cloudinary upload not configured. Set up backend API endpoint.')
}

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  // This should call your backend API to delete from Cloudinary
  // Example API call:
  // const response = await fetch('/api/delete-image', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ publicId })
  // })
  
  console.log('Delete from Cloudinary:', publicId)
  throw new Error('Cloudinary delete not configured. Set up backend API endpoint.')
}

export const getCloudinaryUrl = (
  publicId: string,
  transformation?: string
): string => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloudName) {
    console.error('Cloudinary cloud name not configured')
    return ''
  }

  let url = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`
  if (transformation) {
    url = `https://res.cloudinary.com/${cloudName}/image/upload/${transformation}/${publicId}`
  }
  return url
}

// TODO: Update the following with your Cloudinary credentials:
// 1. Get your Cloudinary credentials from https://cloudinary.com
// 2. Set up an upload preset in your Cloudinary dashboard
// 3. Add the following environment variables:
//    - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
//    - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
// 4. Set up a backend API endpoint for secure uploads
// 5. Implement the upload/delete logic on your server
// 6. Add webhook handling for image processing
