import { useEffect } from "react";

function ParticlesBackground() {
  useEffect(() => {
    const script = document.createElement("script");
    const script2 = document.createElement("script");
    script.src = "../public/particles.min.js";
    script2.src = "./js/app.js";
    script.onload = () => {
      window.particlesJS.load("particles-js", "../puclic/particles.json", () => {
        console.log("Particles yuklandi!");
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="particles-js"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    ></div>
  );
}

export default ParticlesBackground;
