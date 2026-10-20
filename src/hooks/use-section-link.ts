import { useLocation, useNavigate } from "react-router-dom";

/** Scrolls to a section on the home page, or navigates there first. */
export const useSectionLink = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (pathname === "/" && el) {
      el.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
    } else {
      navigate(`/#${id}`);
    }
  };
};
