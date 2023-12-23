/** @type {import('next').NextConfig} */


const nextConfig = {
  experimental: {
    instrumentationHook: true,
},
}


module.exports = async () => {
    console.log("Loading Config");
    return nextConfig;
      
    
  };