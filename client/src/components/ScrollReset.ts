import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollReset () {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/admin') {

      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}