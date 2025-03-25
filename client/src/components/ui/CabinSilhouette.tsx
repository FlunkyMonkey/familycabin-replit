export const CabinSilhouette = () => {
  return (
    <svg
      width="200"
      height="160"
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Cabin shape */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100 10L10 80H30V140H170V80H190L100 10ZM60 80H140V120H60V80Z"
        fill="#8B4513"
      />
      {/* Windows */}
      <rect x="70" y="90" width="20" height="20" fill="#6B8E9F" />
      <rect x="110" y="90" width="20" height="20" fill="#6B8E9F" />
      {/* Door */}
      <rect x="90" y="100" width="20" height="40" fill="#2E5A35" />
      {/* Chimney */}
      <rect x="140" y="20" width="15" height="30" fill="#333333" />
      {/* Smoke */}
      <path
        d="M145 15C148 10 152 12 155 8C158 4 154 0 150 3C146 6 142 4 145 15Z"
        fill="#CCCCCC"
        opacity="0.7"
      />
    </svg>
  );
};

export default CabinSilhouette;
