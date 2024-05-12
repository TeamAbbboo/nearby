// canvas base64 image data를 File 객체로 변환하는 함수
export const dataURLtoFile = (dataUrl: string) => {
  const blobBin = atob(dataUrl.split(',')[1]); // base64 데이터 디코딩
  const array = [];
  for (let i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: 'image/png' });
};
