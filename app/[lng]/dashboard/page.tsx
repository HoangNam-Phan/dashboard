import Card from '@/app/[lng]/components/Card';
import Weather from '@/app/[lng]/components/Weather';
import Stocks from '@/app/[lng]/components/Stocks';

const apps = [
  {
    name: 'CLOCK COMPONENT',
    customClasses: 'row-start-3 lg:row-start-1',
  },
  {
    name: 'TODO COMPONENT',
    customClasses: 'row-start-3 row-span-2 lg:row-start-1',
  },
  {
    name: 'NOTES COMPONENT',
    customClasses: 'row-start-4 lg:row-start-2',
  },
];

export default function Dashboard() {
  return (
    <div className="h-full flex items-center justify-center">
      <div
        className={`
        bg-stone-300 shadow-md rounded-lg bg-white p-5 sm:p-10 pt-14 sm:pt-20 h-full w-full
        grid grid-cols-2 lg:grid-cols-4 
        grid-rows-4 sm:grid-rows-4 lg:grid-rows-2 gap-5
        `}
      >
        <Card customClasses="bg-rose-400 col-span-2 row-start-1">
          <Weather />
        </Card>
        <Card customClasses="col-span-2 col-start-1 row-start-2">
          <Stocks />
        </Card>
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
