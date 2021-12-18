const CoveredImage = ({ alt, src }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <img
        alt={alt}
        className={"w-full h-full max-w-none object-cover"}
        src={src}
        loading="lazy"
      />
    </div>
  );
};

export { CoveredImage };
