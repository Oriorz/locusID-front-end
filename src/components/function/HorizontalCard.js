import React from "react";

const HorizontalCard = () => {
  return (
    <div className="w-11/12 h-full overflow-x-scroll flex flex-row items-center justify-start mx-4 p-3 gap-6 border-b-2 border-solid border-skin-base">
      <div className="flex flex-none flex-col items-center space-y-1 overflow-y-hidden">
        <iframe
          className="w-96 h-[580px] overflow-y-hidden "
          src="https://www.tiktok.com/embed/7235191495257591041"
          allowFullScreen
          scrolling="no"
          allow="encrypted-media;"
        ></iframe>
      </div>
      <div className="flex flex-none flex-col items-center space-y-1 overflow-y-hidden">
        <iframe
          className="w-96 h-[580px]  "
          src="https://www.youtube.com/embed/sUwD3GRPJos"
          allowFullScreen
          scrolling="no"
          allow="encrypted-media;"
        ></iframe>
      </div>
      <div className="flex flex-none flex-col items-center space-y-1 overflow-y-hidden">
        <iframe
          className="w-96 h-[580px] overflow-y-hidden"
          src="https://www.instagram.com/p/CvR8jLorSr2/embed/"
          allowFullScreen
          scrolling="no"
          allow="encrypted-media;"
        ></iframe>
      </div>
      <div className="flex flex-none flex-col items-center space-y-1 overflow-y-hidden">
        <iframe
          allow="encrypted-media;"
          allowFullScreen
          scrolling="no"
          className="w-96 h-[580px] overflow-y-hidden"
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FVBake.KL%2Fposts%2Fpfbid0aS8UYnzNb3raQbrfkXsRNCTQbfNPLvf1UMLkC1Vhe84i49hgQj1GthFAdKMGeXjcl&show_text=true&width=360"
        ></iframe>
      </div>
      <div className="flex flex-none flex-col items-center space-y-1 overflow-y-hidden">
        <iframe
          allow="encrypted-media;"
          allowFullScreen
          scrolling="yes"
          className="w-96 h-[580px] overflow-y-hidden"
          //src="https://www.propertyguru.com.my/property-listing/eco-spring-for-sale-by-maria-tan-36855929"
          src="https://embed.propertyguru.com.my/"
        ></iframe>
      </div>
      <div className="flex flex-none flex-col items-center space-y-1 overflow-y-hidden">
        <iframe
          allow="encrypted-media;"
          allowFullScreen
          scrolling="yes"
          className="w-96 h-[580px] overflow-y-hidden"
          src="https://www.carlist.my/used-cars/otr-price-2011-perodua-myvi-1-3-ezi-hatchback/12578459"
        ></iframe>
      </div>
    </div>
  );
};

export default HorizontalCard;
