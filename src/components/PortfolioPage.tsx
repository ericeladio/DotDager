
import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationItem } from "./NavigationItem";
import { ServiceCard } from "../components/ServiceCard";
import { StatCard } from "../components/StatCard";
import { services, stats } from "./data/services";
import '../background.css';


export function PortfolioPage() {
  const [activeNav, setActiveNav] = useState<string>("home");
  const [inputValue, setInputValue] = useState<string>("0");
  const handleNavClick = (label: string) => {
    setActiveNav(label);
  };
  const handleClick = () => {
    alert(inputValue === "6" ?
      "Wow, you're such a keen observer!" :
      "Oops, that's not the correct answer, but I appreciate your effort!"
    )
    window.location.href = "/lumberjack";
  }
  return (
    <main className="flex overflow-hidden flex-col py-11 bg-black">
      <nav className="flex gap-4 items-center self-end mr-52 text-base font-light tracking-wider text-white whitespace-nowrap max-md:mr-2.5 fixed top-1 z-10 backdrop-blur-md ">
        <NavigationItem
          label="Home"
          isActive={activeNav === "home"}
          onClick={() => handleNavClick("home")}
        />
        <div className="shrink-0 self-stretch w-px h-6 border border-solid border-neutral-200" />
        <NavigationItem
          label="Videos"
          isActive={activeNav === "videos"}
          onClick={() => handleNavClick("videos")}
        />
        <div className="shrink-0 self-stretch w-px h-6 border border-solid border-neutral-200" />
        <NavigationItem
          label="Skills"
          isActive={activeNav === "skills"}
          onClick={() => handleNavClick("skills")}
        />
        <div className="shrink-0 self-stretch w-px h-6 border border-solid border-neutral-200" />
        <NavigationItem
          label="Interests"
          isActive={activeNav === "interests"}
          onClick={() => handleNavClick("interests")}
        />
      </nav>

      <section
        className=" backgroundProfile self-center mt-16 w-full max-w-[1042px] max-md:mt-10 max-md:max-w-full ml-4 "
        id="home"
      >
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <h1 className="self-start text-6xl text-white uppercase max-md:text-4xl">
                Software Developer.
              </h1>
              <p className="mt-1.5 text-base font-light text-stone-500 max-md:max-w-full">
                Hi, <span className="text-sky-500 font-semibold text-lg">I'm Dot Dager</span> I’m a YouTuber who loves sharing tech tips, tutorials, and creative projects. My goal is to make learning fun and accessible for everyone. Check out my work and let’s connect!
              </p>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full ">
            <img
              loading="lazy"
              src="dotProfile.png"
              alt=""
              className="object-contain grow w-full  max-md:mt-5 max-md:max-w-full"
            />
          </div>
        </div>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </section>

      <div className="flex mt-16 w-full bg-sky-500 bg-opacity-20 min-h-[2px] max-md:mt-10 max-md:max-w-full" />

      <section
        className="flex flex-col self-center mt-16 w-full max-w-[1040px] max-md:mt-10 max-md:max-w-full"
        id="videos"
      >
        <h2 className="self-start text-3xl font-medium uppercase text-sky-500 text-opacity-90 ml-4">
          videos
        </h2>
        <div className="flex flex-col  mt-10 w-full shadow-sm bg-zinc-900 max-md:max-w-full">
          <div className="flex justify-center  items-center max-w-full">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/oGHdcLCd7Gs?si=HdGDu2ZyMZnnQkkN"
              title="5 roadmap to become a software developer | Dot Dager"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            >

            </iframe>
          </div>
          <div className="flex flex-col items-start py-6 pr-20 pl-5 bg-neutral-900 max-md:pr-5 max-md:max-w-full">
            <h3 className="text-base font-bold text-white uppercase">
              5 roadmap to become a software developer
            </h3>
            <p className="mt-1.5 text-base font-light text-neutral-400 max-md:max-w-full">
              Discover 5 clear roadmaps to become a software developer! Whether you're into web, mobile, game development, or data science, this video breaks down the skills, tools, and steps needed for each path. Perfect for beginners or those looking to switch careers.
            </p>
          </div>
        </div>
        <div className="flex flex-col   mt-10 w-full shadow-sm bg-zinc-900 max-md:max-w-full ">
          <div className="flex justify-center  items-center max-w-full">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Svm2CZQVUPg?si=wXRrVitRQnjlOUMO"
              title="C# is not for game development"
            >

            </iframe>
          </div>
          <div className="flex flex-col items-start py-6 pr-20 pl-5 bg-neutral-900 max-md:pr-5 max-md:max-w-full">
            <h3 className="text-base font-bold text-white uppercase">
              C# is not for game development
            </h3>
            <p className="mt-1.5 text-base font-light text-neutral-400 max-md:max-w-full">
              Think C# is only for game development? Think again! In this video, we’ll explore how C# goes far beyond gaming, powering web applications, desktop software, mobile apps, and more. Discover the versatility of C# and why it’s a must-learn language for developers of all kinds!
            </p>
          </div>
        </div>
        <div className="flex flex-col  my-10 w-full shadow-sm bg-zinc-900 max-md:max-w-full">
          <div className="flex justify-center  items-center max-w-full">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/JMzoBcPpwhk?si=E1QIcMkQzCBHWmRf"
              title="Using AI to restore my honor."
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            >

            </iframe>
          </div>
          <div className="flex flex-col items-start py-6 pr-20 pl-5 bg-neutral-900 max-md:pr-5 max-md:max-w-full">
            <h3 className="text-base font-bold text-white uppercase">
              Using AI to restore my honor."
            </h3>
            <p className="mt-1.5 text-base font-light text-neutral-400 max-md:max-w-full">
              I explore how AI can be used to restore honor and rebuild reputation. Whether it's leveraging technology for personal growth or improving public perception, AI offers powerful tools to help individuals recover from setbacks and regain their dignity."
            </p>
          </div>
        </div>
      </section>

      <section
        className="flex flex-col items-center pl-4 mt-14 w-full max-md:mt-10 max-md:max-w-full"
        id="skills"
      >
        <div className="flex shrink-0 self-stretch h-0.5 bg-sky-500 bg-opacity-20 max-md:max-w-full" />
        <div className="mt-14 w-full max-w-[1040px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[38%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10">
                <h2 className="self-start text-4xl font-medium text-sky-500 text-opacity-90">
                  Skills
                </h2>
                <p className="mt-1.5 text-sm font-light text-stone-500">
                  I specialize in web development, coding tutorials, and digital content creation. With experience in various programming languages and technologies, I focus on delivering clear and engaging tutorials that help others master coding concepts and build real-world projects.
                </p>
              </div>
            </div>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col ml-5 w-[21%] max-md:ml-0 max-md:w-full"
              >
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 w-full max-w-[1040px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-20 flex-wrap max-md:flex-col">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="flex mt-28 w-full bg-sky-500 bg-opacity-20 min-h-[2px] max-md:mt-10 max-md:max-w-full" />
      <section
        className="flex  pt-14 flex-col self-center  w-full max-w-[1040px] max-md:mt-10 max-md:max-w-full "
        id="interests"
      >
        <h2 className="self-start text-3xl font-medium uppercase text-sky-500 text-opacity-90">
          Interests
        </h2>
        <div className="flex gap-10 flex-wrap justify-center">
          <div className="flex flex-col pt-14 mt-4 w-[300px]  max-md:max-w-[300px] h-[450px]  justify-between">
            <h3 className="text-base font-bold text-white uppercase">Guitar</h3>
            <p className="mt-2 text-sm font-light text-stone-500">Imagine rocking out on your guitar while snacking on pickles — because who says you can't shred and crunch at the same time? It's the perfect combo.</p>
            <div className="flex flex-col  w-full shadow-sm  max-md:max-w-full">
              <div className="w-[300px] h-[300px]" >
                <iframe src="https://giphy.com/embed/P6Pt8lZw7BiQo" width="100%" height="100%" allowFullScreen></iframe>
              </div>
            </div>
          </div>
          <div className="  flex flex-col pt-14 mt-4 w-[300px]  max-md:max-w-[300px] h-[450px]  justify-between">
            <h3 className="text-base font-bold text-white uppercase">Develop</h3>
            <p className=" my-2 text-sm font-light text-stone-500">
              Coding and pickles — because sometimes the best bugs are the ones in your code, not your jar! Debugging with a crunch, one pickle at a time.</p>
            <div className="flex flex-col  w-full shadow-sm  max-md:max-w-full">
              <div className="w-[300px] h-[300px]" >
                <iframe src="https://giphy.com/embed/2nTWV9aDiJbFe" width="100%" height="100%" allowFullScreen></iframe>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-14 mt-4 w-[300px]  max-md:max-w-[300px] h-[450px] justify-around">
            <h3 className="text-base font-bold text-white uppercase">Philosophy</h3>
            <p className="my-4 text-sm font-light text-stone-500">
              Philosophy and pickles — pondering the meaning of life, one crunchy bite at a time. Are we the brine, or the cucumber?.</p>
            <div className="flex flex-col  w-full shadow-sm  max-md:max-w-full">
              <div className="w-[300px] h-[300px]" >
                <iframe src="https://giphy.com/embed/5xaOcLCp8sxC25mCwec" width="100%" height="100%" allowFullScreen></iframe>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-14 mt-4 w-[300px]  max-md:max-w-[300px] h-[450px]  justify-between">
            <h3 className="text-base font-bold text-white uppercase">Cats</h3>
            <p className="mt-2 text-sm font-light text-stone-500">Cats and pickles — because nothing says "mystery" like a cat's face when it meets a cucumber. Add a pickle, and you've got a purrfectly puzzling snack!</p>
            <div className="flex flex-col  w-full shadow-sm  max-md:max-w-full">
              <div className="w-[260px] h-[260px]" >
                <iframe src="https://giphy.com/embed/XD0fzld6oO5NbWFCsY" width="100%" height="100%" allowFullScreen></iframe>
              </div>
            </div>
          </div><div className="flex flex-col pt-14 mt-4 w-[300px]  max-md:max-w-[300px]">
            <h3 className="text-base font-bold text-white uppercase">Pickles!</h3>
            <p className="my-10 text-sm font-light text-stone-500">
              I think I've already said too much about pickles
            </p>
            <div className="flex flex-col  w-full shadow-sm  max-md:max-w-full">
              <div className="w-[300px] h-[300px]" >
                <iframe src="https://giphy.com/embed/Fi1FBKRBeDGxi" width="100%" height="100%" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
        <h3 className="self-start text-2xl font-medium text-sky-500 text-opacity-90 mb-4">
          How many images of pickles are on the page ?
        </h3>
        <input
          className="text-sm text-slate-950 w-[120px] mb-4"
          type="number"
          id="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="0"
        />
        <button
          className="text-sm text-white w-[120px] hover:text-sky-500 bg-sky-500  hover:bg-white rounded-sm"
          onClick={handleClick}
        >
          Submit
        </button>
      </section>
      <div className="flex mt-28 w-full bg-sky-500 bg-opacity-20 min-h-[2px] max-md:mt-10 max-md:max-w-full" />
      <footer className="flex flex-col items-center mt-10">
        <div className=" text-white flex gap-5">
          <a
            href="https://tr.ee/sAfuCwxTkr"
            target="_blank"
            className="text-3xl hover:text-sky-500"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://www.youtube.com/@DotDager"
            target="_blank"
            className="text-3xl hover:text-sky-500"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a
            href="https://github.com/MarianoVilla/DotDager"
            target="_blank"
            className="text-3xl hover:text-sky-500"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
        <p className="self-center mt-5 text-base leading-loose text-center text-white">
          © 2024 DOT DAGER. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
