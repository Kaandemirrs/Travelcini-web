/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // <--- İŞTE BU EKSİK! Bunu eklemezsek out klasörü çıkmaz.
  images: {
    unoptimized: true, // <--- Resimlerin Hostinger'da görünmesi için şart.
  },
};

export default nextConfig;