import { ReactNode, useRef, useEffect } from "react";
import { getAssetPath } from "../utils/assetPath";
import { getIconByName, siSlickpic } from "../utils/simpleIcons";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  icon?: ReactNode;
  images?: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
  videos?: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
}

const Work = () => {
  const dialogRefs = useRef<(HTMLDialogElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;

    // Set random rotations immediately
    for (let i = 1; i <= 5; i++) {
      const isNegative = i % 2 === 1;
      const randomAngle = (Math.random() * 6 + 2) * (isNegative ? -1 : 1);
      root.style.setProperty(`--stack-rotation-${i}`, `${randomAngle}deg`);
    }

    // Enable animations after a delay to let ViewTransition complete
    let sectionEl: HTMLDivElement | null = null;
    const timer = setTimeout(() => {
      sectionEl = sectionRef.current;
      sectionEl?.classList.add("work-ready");
    }, 650); // 600ms transition + 50ms buffer

    return () => {
      clearTimeout(timer);
      sectionEl?.classList.remove("work-ready");
    };
  }, []);

  const handleStackClick = (index: number) => {
    const dialog = dialogRefs.current[index];
    if (dialog) {
      dialog.showModal();
      requestAnimationFrame(() => {
        dialog.classList.add("dialog-open");
      });
    }
  };

  const handleDialogClose = (dialog: HTMLDialogElement) => {
    const dialogIndex = dialogRefs.current.indexOf(dialog);
    const triggerButton = buttonRefs.current[dialogIndex];

    // Start the closing animation
    dialog.classList.remove("dialog-open");

    // Wait for the animation to finish before actually closing
    const handleTransitionEnd = () => {
      dialog.close();
      if (triggerButton) {
        triggerButton.focus();
      }
      dialog.removeEventListener("transitionend", handleTransitionEnd);
    };

    dialog.addEventListener("transitionend", handleTransitionEnd);
  };

  const projects: Project[] = [
    {
      title: "Fabrica (current)",
      icon: (
        <img
          src={getAssetPath("icons/fabrica.png")}
          alt="Fabrica logo"
          width={24}
          height={24}
        />
      ),
      description:
        "Fabrica brings physical land onchain, and allows you to buy, sell, borrow againsg it, and trade it. As the only front end developer on the team, I'm responsible for the entire user experience.",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Mapbox",
        "TailwindCSS",
        "Claude",
        "Wagmi",
        "Motion",
      ],
      link: "https://fabrica.land/",
      videos: [
        {
          src: getAssetPath("work/fabrica/flip.mov"),
          alt: "Credit history flip animation",
          caption: "Credit history flip animation",
        },
        {
          src: getAssetPath("work/fabrica/map-visualization.mp4"),
          alt: "Mapbox dynamic parcel locator animation",
          caption: "Mapbox dynamic parcel locator for smoother onboarding",
        },
      ],
      images: [
        {
          src: getAssetPath("work/fabrica/1.webp"),
          alt: "List for sale modal",
          caption: "Clear and concise list for sale modal",
        },
        {
          src: getAssetPath("work/fabrica/2.webp"),
          alt: "Blockchain interactions that make sense to everyone",
          caption: "Blockchain interactions that make sense to everyone",
        },
        {
          src: getAssetPath("work/fabrica/3.webp"),
          alt: "Marketplace land purchase options",
          caption: "Marketplace land purchase made easy",
        },
        {
          src: getAssetPath("work/fabrica/4.webp"),
          alt: "Expressive profile activity feeds",
          caption: "Expressive profile activity feeds",
        },
      ],
    },
    {
      title: "Better Do It",
      icon: (
        <img
          src={getAssetPath("icons/better-do-it-favicon.png")}
          alt="Better Do It logo"
          width={24}
          height={24}
        />
      ),
      description:
        "Better Do It is an AI-driven side project that encourages accountability by sharing progress among friends. It features AI task suggestions based on local weather, a custom comment system, advanced accessibility, drag and drop, and easy sign-in via Google authentication.",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "TailwindCSS",
        "Claude",
        "SQL",
      ],
      link: "https://better-do-it.com",
      images: [
        {
          src: getAssetPath("work/better-do-it/1.webp"),
          alt: "Clean, fast, mobile-friendly UI",
          caption: "Clean, fast, mobile-friendly UI",
        },
        {
          src: getAssetPath("work/better-do-it/2.webp"),
          alt: "Easy sign-in with Google authentication",
          caption: "Easy sign-in with Google authentication",
        },
        {
          src: getAssetPath("work/better-do-it/3.webp"),
          alt: "AI-driven task suggestions based on local weather patterns",
          caption: "AI-driven task suggestions based on local weather patterns",
        },
        {
          src: getAssetPath("work/better-do-it/4.webp"),
          alt: "Accessible, modern drag and drop",
          caption: "Accessible, modern drag and drop",
        },
        {
          src: getAssetPath("work/better-do-it/5.webp"),
          alt: "Hand-rolled comment system",
          caption: "Hand-rolled comment system",
        },
      ],
    },
    {
      title: "Custom Blog Integration",
      icon: (
        <svg className="logo" style={{ width: 22, height: 24 }}>
          <use
            xlinkHref={getAssetPath("assets/svg-defs.svg") + "?v=2#svg-logo"}
          />
        </svg>
      ),
      description:
        "This web app integreates with a custom markdown blog, and allows you to create, edit, and delete posts.",
      technologies: ["React", "Vite", "TypeScript", "MDX", "Claude"],
      videos: [
        {
          src: getAssetPath("work/custom-blog/view-transition-api.mov"),
          alt: "View Transition API",
          caption:
            "Using the View Transition API to create a smooth transition between pages",
        },
        {
          src: getAssetPath("work/custom-blog/lighthouse-100-percent.mov"),
          alt: "100 Percent Lighthouse Score",
          caption: "A perfect Lighthouse score",
        },
      ],
      images: [
        {
          src: getAssetPath("work/custom-blog/1.webp"),
          alt: "Blog post editor with live preview",
          caption: "Rich markdown editor with live preview",
        },
      ],
    },
    {
      title: "ImgStacks",
      icon: (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill={`#${siSlickpic.hex}`}
          aria-label="SlickPic"
        >
          <path d={siSlickpic.path} />
        </svg>
      ),
      description:
        "ImgStacks is an open-source React component I published for building interactive image stacks with randomized rotation angles for a more organic feel, configurable aspect ratios, and images lazy loaded by default. It includes a modal gallery for full-size images, touch-friendly swipe navigation, dark mode support, smooth animations, and accessible defaults—so you can add polished stacked previews without rebuilding the same UI in every project.",
      technologies: ["React", "TypeScript", "CSS"],
      link: "https://github.com/antibland/img-stacks",
    },
    {
      title: "CodePen Projects",
      icon: (
        <img
          src={getAssetPath("icons/codepen-logo-colorful.png")}
          alt="CodePen logo"
          width={20}
          height={20}
        />
      ),
      description:
        "I've had so much fun with CodePen over the years. More recently, I use it for prototyping ideas and sandboxing newer technologies.",
      technologies: ["React", "JavaScript", "CSS", "SCSS"],
      link: "https://codepen.io/antibland",
      images: [
        {
          src: getAssetPath("work/codepen/animated-stacked-pages.gif"),
          alt: "Animated Stacked Pages",
          caption:
            "Using SCSS loops to create stacks of paper with slightly different angles and shadows, creating a more organic, realistic presentation of paper.",
        },
        {
          src: getAssetPath("work/codepen/slot-machine.gif"),
          alt: "React Slot Machine Demo",
          caption:
            "A slot machine built with vanilla React. The challenge here was setting up the sprites properly and applying a smooth, realistic easing animation to each wheel of the slot.",
        },
        {
          src: getAssetPath("work/codepen/brady-bunch.gif"),
          alt: "CSS Grid: Brady Bunch Edition",
          caption:
            "When Grid was considered bleeding edge (and really misunderstood), I wanted to create a fun example of how it could be used. This pen is a tribute to the Brady Bunch opening sequence.",
        },
        {
          src: getAssetPath("work/codepen/vertical-swaying-tabs.gif"),
          alt: "Swaying Vertical Tabs",
          caption:
            "Vertical tabs with a gentle breeze animation, creating an organic overlapping effect during the peak of their respective sway.",
        },
      ],
    },
    {
      title: "Stack Overflow Elite Contributor",
      icon: (
        <svg className="logo" style={{ width: 22, height: 20, fill: "orange" }}>
          <use
            xlinkHref={getAssetPath("assets/svg-defs.svg") + "?v=3#svg-so"}
          />
        </svg>
      ),
      description: `I've reached millions of people over a ${
        new Date().getFullYear() - 2011
      } year period, and have been a top contributor to Stack Overflow during its most vibrant years.`,
      technologies: ["React", "JavaScript", "TypeScript", "CSS"],
      link: "https://stackoverflow.com/users/949217/andy-hoffman",
    },
  ];

  return (
    <section id="portfolio" ref={sectionRef} className="section">
      <div className="content">
        <div className="projects">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3 className="project-title">
                {project.icon && (
                  <span className="project-icon">{project.icon}</span>
                )}
                <span>{project.title}</span>
              </h3>
              {project.images && (
                <>
                  <button
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    className="project-images-stack"
                    onClick={() => handleStackClick(index)}
                    aria-label={`View all ${project.title} assets`}
                    aria-controls={`project-dialog-${index}`}
                  >
                    {project.images.map((image, imgIndex) => {
                      const numAssets = project.images
                        ? project.images.length + (project.videos?.length || 0)
                        : 0;
                      return (
                        <div key={imgIndex} className="project-image-wrapper">
                          <img
                            className="project-image"
                            src={image.src}
                            alt={image.alt}
                          />
                          {imgIndex === 0 && (
                            <div className="project-image-caption">
                              {numAssets === 1 && "View asset(s)"}
                              {numAssets > 1 &&
                                `View all ${numAssets} project assets`}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </button>
                  <dialog
                    id={`project-dialog-${index}`}
                    ref={(el) => {
                      dialogRefs.current[index] = el;
                    }}
                    className="project-dialog"
                    onCancel={(e) => {
                      e.preventDefault();
                      handleDialogClose(e.currentTarget);
                    }}
                    onClick={(e) => {
                      if (e.target === e.currentTarget) {
                        handleDialogClose(e.currentTarget);
                      }
                    }}
                  >
                    <div className="dialog-content">
                      <header className="dialog-header">
                        <h2 className="dialog-title">{project.title}</h2>
                        <button
                          className="dialog-close"
                          onClick={(e) =>
                            handleDialogClose(
                              e.currentTarget.closest("dialog")!,
                            )
                          }
                          aria-label="Close dialog"
                        >
                          ×
                        </button>
                      </header>
                      <div className="dialog-body">
                        {project.videos &&
                          project.videos?.length > 0 &&
                          project.videos?.map((video, videoIndex) => (
                            <figure key={`video-${videoIndex}`}>
                              <video
                                src={video.src}
                                autoPlay
                                muted
                                loop
                                playsInline
                              />
                              <figcaption>{video.caption}</figcaption>
                            </figure>
                          ))}
                        {project.images?.length > 0 &&
                          project.images?.map((image, imgIndex) => (
                            <figure key={imgIndex}>
                              <img src={image.src} alt={image.alt} />
                              <figcaption>{image.caption}</figcaption>
                            </figure>
                          ))}
                      </div>
                    </div>
                  </dialog>
                </>
              )}
              <div className="project-content">{project.description}</div>
              <div className="technologies">
                {project.technologies.map((tech, i) => {
                  const icon = getIconByName(tech);
                  return (
                    <span key={i} className="tech-tag">
                      {icon && (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="skill-icon"
                          fill="currentColor"
                        >
                          <path d={icon.path} />
                        </svg>
                      )}
                      {tech}
                    </span>
                  );
                })}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
