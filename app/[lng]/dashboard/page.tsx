import Card from '@/app/[lng]/components/Card';

const apps = [
  {
    name: 'WEATHER COMPONENT',
    customClasses: 'col-span-2',
  },
  {
    name: 'STOCK COMPONENT',
    customClasses: 'col-span-2 col-start-1 row-start-2',
  },
  {
    name: 'CLOCK COMPONENT',
    customClasses: 'col-start-3 row-start-1',
  },
  {
    name: 'TODO COMPONENT',
    customClasses: 'row-span-2 col-start-4 row-start-1',
  },
  {
    name: 'NOTES COMPONENT',
    customClasses: 'col-start-3 row-start-2',
  },
];

export default function Dashboard() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-gray-100 shadow-md rounded-lg bg-white p-10 pt-24 h-full w-full grid grid-cols-4 grid-rows-2 gap-4">
        {apps.map((app) => {
          return (
            <Card key={app.name} customClasses={app.customClasses}>
              {app.name}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
