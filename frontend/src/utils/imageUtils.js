export const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    message.error('Solo puedes subir archivos de imagen!');
    return Upload.LIST_IGNORE;
  }

  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('La imagen debe ser menor a 5MB!');
    return Upload.LIST_IGNORE;
  }

  return false;
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}; 