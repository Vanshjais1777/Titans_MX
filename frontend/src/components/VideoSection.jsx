import React from "react";

const VideoSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Fullscreen Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="src/assets/Video_1.mp4" // Replace with your video URL
        autoPlay
        loop
        muted
      >
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-6">
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
