const CubeVideo = () => {
  return (
    <video
      width="400"
      height="240"
      autoPlay
      loop
      muted
      playsInline
      className="lg:hidden absolute left-0 top-12 h-[225px] w-full"
    >
      <source src="/video/cube-video.mp4" type="video/mp4" />
    </video>
  );
};

export default CubeVideo;
