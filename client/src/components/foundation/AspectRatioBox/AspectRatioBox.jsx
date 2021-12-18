const AspectRatioBox = ({ aspectHeight, aspectWidth, children }) => {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${aspectWidth} / ${aspectHeight}` }}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};

export { AspectRatioBox };
