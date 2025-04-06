const StackSection = ({ title, stack }: any) => {
  return (
    <div className=" mt-3">
      <h3 className={`text-sm font-semibold my-1 tracking-wider`}>{title}</h3>
      <div className=" flex gap-2 flex-wrap text-sm ml-2">
        {stack.split(',').map((item: string) => (
          <p
            key={item}
            className="px-3 py-0.5 rounded-full h-fit w-fit dark:bg-gray-600 bg-gray-200 text-sm"
          >
            {item.trim()}
          </p>
        ))}
      </div>
    </div>
  );
};

const TechnologyStack = () => {
  const tecknologies: Record<string, string> = {
    Frontend:
      'React js, Redux ,Three.js, React Three Fiber, CSS, SCSS, Responsive Design, Styled-components, Tailwind, API Handling',
    Backend:
      'Python, Django, FastAPI, JSON, SQLAlchemy, Data Processing, Celery, Socket.IO',
    Databases: 'MySQL, Postgres, MongoDB',
    DevOps: 'AWS, S3, ECR, Docker, Lens, Docker Compose',
    'UI/UX': 'Figma, Blender 3D, Fig-jam Board, Photoshop, Miro',
  };

  return (
    <div>
      <strong>Technology Stack:</strong>
      {Object.entries(tecknologies).map(([key, value]) => (
        <StackSection key={key} title={key} stack={value} />
      ))}
    </div>
  );
};

export default TechnologyStack;
