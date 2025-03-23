export function getBodyBgImg(): string {
    // 获取body元素 bg img 变量值
    const imgUrl = getComputedStyle(document.documentElement).getPropertyValue("--bg-img").trim();
    const imgMatch = imgUrl.replace(/url\(["']?|["']?\)/g, "").trim();
    return imgMatch
}

export function setGlobalStyle(key: string, value: string) {
    // 设置全局style变量
    console.log(key, value)
    document.documentElement.style.setProperty(key, value)
    return null
}

export const getAverageColor = async (src: string, opacity: number): Promise<string> => {
    // 获取图片的平均rgb值
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src; // 直接使用本地 public 资源
      img.onload = () => {
        const canvas = new OffscreenCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");
  
        if (!ctx) {
          reject("Canvas not supported");
          return;
        }
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
  
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < imageData.length; i += 4) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
          count++;
        }
        const darkenFactor = 1;
        r = Math.floor(r * darkenFactor);
        g = Math.floor(g * darkenFactor);
        b = Math.floor(b * darkenFactor);
        resolve(`rgba(${Math.floor(r / count)}, ${Math.floor(g / count)}, ${Math.floor(b / count)}, ${opacity})`);
      };
  
      img.onerror = reject;
    });
  };