import React, { useEffect } from "react";
import { useNavigate } from "react-router";

interface Props {
  path: string,
  scrollWidth: number
}

const useScrollNavigate: React.FC<Props> = (props) => {
  const { path, scrollWidth } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollWidth) {
        navigate(`/${path}`);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navigate, path, scrollWidth]);

  return (
    <div style={{ height: "200vh", padding: "20px" }}>
      <h1>Scroll down to navigate</h1>
    </div>
  );
};

export default useScrollNavigate;
