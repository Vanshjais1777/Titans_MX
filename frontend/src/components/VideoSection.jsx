import React from "react";

const VideoSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-tr from-green-300 via-white to-green-300">
      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-black px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          "Your Future Starts Here."
        </h2>
        <p className="text-lg md:text-2xl max-w-2xl mb-6 animate-slide-in">
          Discover your dream job or internship. Build connections, learn skills, and unlock endless opportunities on our platform.
        </p>
      </div>
    </section>
  );
};

export default VideoSection;
