import React from 'react';
import Carousel from './Carousel';

const HeroSection = () => {
  const images = [
    'https://www.johnjacobseyewear.com/cdn/shop/files/DESKTOP_HOMEPAGE_BANNER_9f2ba24f-68c2-4a6c-a385-96445dc1f4e5_1900x.png?v=1719647029',
    'https://www.johnjacobseyewear.com/cdn/shop/files/DESKTOP_HOMEPAGE_BANNER_ed070f2b-7726-4613-91e4-5a605ff6295a_1900x.png?v=1723450864',
    'https://www.johnjacobseyewear.com/cdn/shop/files/DESKTOP_HOMEPAGE_BANNER_c5c41aab-abf6-4661-9a93-700a02378d14_1900x.jpg?v=1721481769',
    'https://www.johnjacobseyewear.com/cdn/shop/files/DESKTOP_HOMEPAGE_BANNER_e7a73fb0-8e84-4a25-9398-4444fe236b2b_1900x.jpg?v=1716186165',
    ];

    const glassesData = [
        {
          name: 'Rimless Glasses',
          image: 'https://cdn.shopify.com/s/files/1/1276/5299/files/rimless_glasses.png',
        },
        {
          name: 'Transparent Frames',
          image: 'https://cdn.shopify.com/s/files/1/1276/5299/files/transparent_frames.png',
        },
        {
          name: 'Rich Acetate Eyeglasses',
          image: 'https://cdn.shopify.com/s/files/1/1276/5299/files/rich_acetate_new.png',
        },
        {
          name: 'Metalworks',
          image: 'https://cdn.shopify.com/s/files/1/1276/5299/files/sleek_metalworks.png',
        },
        {
          name: 'BLU Computer Glasses',
          image: 'https://cdn.shopify.com/s/files/1/1276/5299/files/blu_computer_glasses.png',
        },
        {
          name: 'JJ Classics',
          image: 'https://cdn.shopify.com/s/files/1/1276/5299/files/timeless_design.png',
        },
      ];


  return (
    <>
        <div className="flex flex-col items-center">
            <Carousel images={images} />
        </div>
        <div className='h-32 flex justify-center items-center '>
            <h1 className='text-3xl font-bold uppercase '>As seen on</h1>
        </div>
        <div>
            <img src="https://www.johnjacobseyewear.com/cdn/shop/files/AsSeenOn_Desktop2_1900x.jpg?v=1706704896" 
            alt="banner" />
        </div>
        <div className='flex flex-col items-center justify-center mt-10'>
            <h2 className='text-3xl font-bold uppercase items-center justify-center'>
                John Jacobs X Outhouse
            </h2>
            <h3 className=' text-lg pt-2'>Perceive a new reality!</h3>
        </div>
        <div>
                <video className ="banner_video" playsInline="" poster="//www.johnjacobseyewear.com/cdn/shop/files/Homepage-Video-Thumbnail.jpg?v=1712306331" controls="">
                    <source src="https://cdn.shopify.com/videos/c/o/v/e1e76bc8cb6f4da095e56c4c9a51a75b.mp4" type="video/mp4" />
                    <source src="https://cdn.shopify.com/videos/c/o/v/e1e76bc8cb6f4da095e56c4c9a51a75b.mp4" type="video/ogg" />
                    Your browser does not support the video tag.
                </video>
        </div>
        <div className="flex flex-wrap justify-center mt-10">
            {glassesData.map((glasses) => (
                <div key={glasses.name} className="flex flex-col items-center m-4">
                    <img
                        src={glasses.image}
                        alt={glasses.name}
                        className="w-40 h-40 rounded-full object-cover"
                    />
            <h3 className="mt-2 text-lg font-semibold">{glasses.name}</h3>
            </div>
      ))}
    </div>
        


    </>

    
  );
};

export default HeroSection;
