import { MdOutlineMore } from 'react-icons/md';
import DownloadResume from '../../components/DownloadResume';
import BackBtn from '../../components/BackBtn';
import useDocumentTitle from '../documentTitle/ChangeTitle';

const details: any = {
  name: 'Bittu Kumar',
  location: 'Bihar, India',
  contacts: {
    phone: {
      label: '+91 756387 2977',
      url: 'tel:+917563872977',
    },
    email: {
      label: 'bk183040@gmail.com',
      url: 'mailto:bk183040@gmail.com',
    },
    linkedin: {
      label: 'linkedin.com/in/bittukumar183040',
      url: 'https://www.linkedin.com/in/bittukumar183040/',
    },
    github: {
      label: 'Github',
      url: 'https://github.com/BittuKumar183040',
    },
    portfolio: {
      label: 'Portfolio Website',
      url: 'https://bittukr.vercel.app/',
    },
  },
  sections: {
    'Profile Summary': [
      {
        descList: [
          [
            'Full-stack developer with a strong focus on <strong>front-end technologies</strong>  and expertise in <strong>React.js</strong>, creating scalable application.',
          ],
          [
            'Skilled in optimizing web application for performance and responsiveness, with a focus on user-centric design.',
          ],
          [
            'Proven ability to collaborate effectively in team environments, manage time efficiently and troubleshoot technical challenges.',
          ],
          [
            'Expertise in <strong> React.js, Node.js, Postgres DB,</strong> and using <strong>Agile methodologies</strong> to deliver high quality projects on time.',
          ],
        ],
      },
    ],

    'Technical Skills': [
      {
        descList: [
          ['React/Redux', 'HTML', 'CSS/SCSS', 'Tailwind'],
          ['JavaScript', 'Typescript', 'Bootstrap', 'Git'],
          ['WebGL', 'Blender', 'Figma', 'Github'],
          ['Python', 'Django', 'Express Js', 'Node Js'],
          ['Postgresql', 'MySQL', 'AWS/S3', 'Docker'],
        ],
      },
    ],

    Experience: [
      {
        title: 'BosonQ Psi Private Limited',
        date: 'Jan 2023 - Current',
        subtitle: {
          title: 'Full Stack Web Development',
          date: '2 yr',
        },
        details: [
          'Backend: Python, Django, FastAPI, SQLAlchemy, JSON, Data Processing, Celery, Socket IO.',
          'Databases: MySQL, Postgres, MongoDB.',
          'DevOps: AWS, S3, ECR, Docker, Docker Compose, Lens.',
          'Frontend: React, JavaScript, Redux, Three.js, CSS (SCSS, Tailwind, Styled-components), Responsive Design, API',
          'Handling (fetch, axios)',
          'UI: Figma, Fig-jam Board, Miro, Photoshop, Blender 3D.',
        ],
        descList: [
          [
            'With 2 years of experience at this company, I play a key role in the software team, handling both frontend and backend development.',
          ],
          [
            'Developed developed multiple POCs and led the development of an in-house 3D model visualization tool to display simulation results and uploaded CAD files.',
          ],
          [
            'Collaborated with a team of 5+ developers, showcasing strong communication and technical skills to implement features that engaged users.',
          ],
        ],
      },
    ],

    Projects: [
      {
        title: 'Shop With Us ',
        date: 'Nov 2024',
        details: [
          'React',
          'Tailwind CSS',
          'Redux',
          'Route Optimization',
          'Lazy Loading',
          'Google Auth',
          'Node Js',
          'PostgreSql',
          'Express Js',
        ],
        subtitle: {
          title: 'E-Commerce',
          date: '',
        },
        links: {
          'Github Repo': 'https://github.com/BittuKumar183040/ShopWithUs',
          'Visit Website': 'https://sw-us.vercel.app/',
        },
        descList: [
          [
            'Developed a fully functional E-commerce website incorporating various features to enhance the shopping experience. This project demonstrates my expertise in HTML, CSS, and JavaScript.',
          ],
          ['Seamless and secure authentication via Google.'],
          ['Displays an attractive and responsive product catalog.'],
          ['Dynamic updates for items, quantities, and prices.'],
          ['Recommendations based on user preferences.'],
        ],
      },
      {
        title: '3D Renderer',
        date: 'Jan 2025',
        subtitle: {
          title: 'Web Browser Based 3D Model Renderer and visualizer. ',
          date: '',
        },
        details: [
          'React Three Fiber ',
          'React Three Drui ',
          'Redux',
          'Tailwind CSS ',
          'Visualization Tools ',
          'Three Js ',
          'File Handling',
          'Memory Optimization ',
        ],
        links: {
          'Github Repo': 'https://github.com/BittuKumar183040/ShopWithUs',
          'Visit Website': 'https://sw-us.vercel.app/',
        },
        descList: [
          [
            'Rotate, zoom, and pan your models to get the perfect view. Explore your 3D files from every angle and detail.',
          ],
          [
            'Real-Time Rendering: Added high-quality real-time rendering of your 3D models with the ability to tweak lighting, textures, and materials on the fly.',
          ],
          [
            'User-Friendly Interface: A simple and intuitive interface that allows users to load and manipulate 3D models with ease. ',
          ],
          [
            'Optimized for Performance: Built to handle complex 3D assets without compromising on speed or responsiveness, ensuring smooth and fluid performance.',
          ],
          [
            'Easily visualize and interact with different formats of models used in industry-standard. ',
          ],
        ],
      },
    ],
    Education: [
      {
        title: 'LNCT Group of Colleges',
        date: '2021 - 2023',
        subtitle: {
          title: 'Masters in computer Application',
          date: 'Bhopal, Madhya Pradesh',
        },
      },
      {
        title: 'Sikkim Manipal University (DE)',
        date: '2017 - 2021',
        subtitle: {
          title: 'Bachelor in Computer Application',
          date: 'Gangtok, Sikkim',
        },
      },
    ],
  },
};

const Resume = () => {
  useDocumentTitle('Resume | Bittu Kumar');

  return (
    <>
      <div className=" container m-auto p-5 max-w-[1000px] py-28 dark:text-white">
        <div className=" md:absolute top-0">
          <BackBtn />
        </div>
        <div className=" relative md:p-20 p-4 flex flex-col gap-4 md:border bg-gray-100 dark:bg-gray-950 rounded-lg">
          {/* Heading */}
          <DownloadResume />
          <section className=" flex flex-col items-center w-full ">
            <h1 className=" text-4xl tracking-wider">{details.name}</h1>
            <p className=" text-xl">{details.location}</p>
            <div className=" flex flex-wrap justify-center mt-4">
              {Object.keys(details.contacts).map((contact: string, idx) => (
                <a
                  className=" mx-2 underline text-blue-500"
                  key={idx + contact}
                  href={details.contacts[contact].url}
                >
                  {details.contacts[contact].label}
                </a>
              ))}
            </div>
          </section>
          {Object.entries(details.sections).map(
            ([key, section]: [string, any]) => (
              <section key={key}>
                <h1 className=" text-xl font-bold tracking-wide">{key}</h1>
                <div className=" h-0.5 my-2 w-full bg-black dark:bg-gray-500"></div>

                {section.map((contents: any, idx: number) => (
                  <div key={idx}>
                    <div className=" flex justify-between items-center mt-2">
                      <h1 className=" text-xl font-medium">{contents.title}</h1>

                      {contents.details && (
                        <div className=" relative group mx-2">
                          <p className=" cursor-pointer opacity-70 group-hover:rotate-90 rotate-0 transition-all ">
                            <MdOutlineMore />
                          </p>
                          <p
                            className=" w-56 group-hover:scale-100 group-hover:opacity-100 flex flex-wrap gap-2
                      scale-0 opacity-0 transition-all absolute bottom-7 -left-2 bg-opacity-50 backdrop-blur-sm 
                     bg-slate-100 shadow-md p-2 rounded-md text-xs md:text-sm"
                          >
                            <span className=" absolute -bottom-4 left-2 opacity-60 border-8 border-t-gray-300 border-transparent"></span>
                            {contents.details.map((item: any, idx: any) => (
                              <span
                                key={idx}
                                className=" bg-slate-100 bg-opacity-50 text-gray-600 px-2 rounded-md shadow-inner"
                              >
                                {item}
                              </span>
                            ))}
                          </p>
                        </div>
                      )}

                      {contents.links && (
                        <div className=" flex gap-5">
                          {Object.entries(contents.links).map(
                            ([key, link]: [key: string, link: any]) => (
                              <a
                                className=" underline text-blue-500 text-xs md:text-sm"
                                key={key}
                                href={link}
                              >
                                {key}
                              </a>
                            ),
                          )}
                        </div>
                      )}

                      <div className=" flex-1 text-right">
                        <p className=" text-sm font-medium">{contents.date}</p>
                      </div>
                    </div>

                    {contents.subtitle && (
                      <div className=" flex justify-between items-center opacity-80">
                        <h1 className=" text-md font-medium">
                          {contents.subtitle.title}
                        </h1>
                        <p className=" text-sm font-medium italic">
                          {contents.subtitle.date}
                        </p>
                      </div>
                    )}

                    {contents.descList && (
                      <div className=" w-full px-5">
                        <table className=" m-auto w-full">
                          {contents.descList.map((lists: any, idx: number) => (
                            <tbody key={idx}>
                              <tr>
                                {lists.map((item: string, idx: number) => (
                                  <td
                                    key={idx}
                                    className=" text-justify py-1 relative"
                                    style={{ width: '1px' }}
                                  >
                                    <span className=" absolute -left-6 scale-50 filter grayscale ">
                                      🔵
                                    </span>
                                    <span
                                      dangerouslySetInnerHTML={{ __html: item }}
                                    />
                                  </td>
                                ))}
                              </tr>
                            </tbody>
                          ))}
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </section>
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default Resume;
