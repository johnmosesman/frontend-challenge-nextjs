import Head from "next/head";
import { useState } from "react";

interface Item {
  name: string;
}
interface Menu {
  [key: string]: Item[];
}

export default function Home() {
  const data: Menu = {
    appetizers: [
      { name: "Buffalo Wings" },
      { name: "Chips & Queso" },
      { name: "Lettuce Wraps" },
      { name: "Breadsticks" },
    ],
    entrees: [{ name: "Hamburger" }, { name: "Pasta" }, { name: "Soup" }],
    desserts: [{ name: "Cake" }, { name: "Ice cream" }, { name: "Cookie" }],
  };

  const courses = Object.keys(data);

  const emptyMenu: Menu = courses.reduce((acc, curr) => {
    acc[curr] = [];
    return acc;
  }, {} as Menu);
  const [chosenList, setChosenList] = useState<Menu>(emptyMenu);

  const defaultCourse = "all";
  const [courseFilter, setCourseFilter] = useState<string>(defaultCourse);
  const [searchFilter, setSearchFilter] = useState<string>();

  console.log("chosenList", chosenList);
  console.log("courseFilter", courseFilter);
  console.log("searchFilter", searchFilter);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="max-w-lg mx-auto mt-12">
          <h1 className="text-xl mb-2">Frontend challenge!</h1>
          <p className="mb-8">
            Complete the functionality (
            <a
              className="underline"
              href="https://twitter.com/johnmosesman/status/1598753931135418372"
            >
              demo here
            </a>
            ) for this mockup using your technique of choice and post your
            solution to{" "}
            <a
              className="underline"
              href="https://twitter.com/johnmosesman/status/1598688398679724033?cxt=HHwWgsC-3Zuo168sAAAA"
            >
              @johnmosesman.
            </a>
          </p>

          <div className="border border-gray-300 rounded p-6">
            <div className="mb-4">
              <p className="mb-1">Select Course</p>
              <div>
                <select
                  className="border border-gray-300 rounded p-2 capitalize"
                  onChange={(e) => {
                    setCourseFilter(e.target.value);
                  }}
                >
                  <option selected value={defaultCourse}>
                    All courses
                  </option>

                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-1">Search Items</p>
              <input
                type="text"
                placeholder="Search Items"
                className="border border-gray-300 rounded p-2"
                value={searchFilter}
                onChange={(e) => {
                  setSearchFilter(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-row justify-between">
              <div>
                <p className="mb-4">All Items</p>

                {Object.keys(data)
                  .filter(
                    (course) =>
                      courseFilter === defaultCourse || course === courseFilter
                  )
                  .map((course) => {
                    const itemsFilteredBySearch = data[course].filter(
                      (item) =>
                        !searchFilter ||
                        item.name
                          .toLowerCase()
                          .includes(searchFilter.toLowerCase().trim())
                    );

                    if (itemsFilteredBySearch.length === 0) {
                      return null;
                    }

                    return (
                      <div key={course} className="mb-4">
                        <p className="font-semibold mb-1 capitalize">
                          {course}
                        </p>
                        <div className="border border-b border-gray-200 mb-2"></div>

                        <div className="flex flex-col">
                          <label>
                            <input
                              type="checkbox"
                              name={`${course}-select-all`}
                              className="mb-2"
                              checked={
                                data[course].length ===
                                chosenList[course].length
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setChosenList({
                                    ...chosenList,
                                    [course]: data[course],
                                  });
                                } else {
                                  setChosenList({
                                    ...chosenList,
                                    [course]: [],
                                  });
                                }
                              }}
                            />
                            Select All
                          </label>

                          {itemsFilteredBySearch.map((item) => {
                            return (
                              <label key={item.name} className="capitalize">
                                <input
                                  type="checkbox"
                                  name={`${course}-${item.name}`}
                                  className="mb-2"
                                  readOnly
                                  checked={chosenList[course].some(
                                    (i) => i.name === item.name
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      const newList = {
                                        ...chosenList,
                                        [course]: [...chosenList[course], item],
                                      };
                                      setChosenList(newList);
                                    } else {
                                      const filteredItems = chosenList[
                                        course
                                      ].filter((i) => i.name !== item.name);

                                      setChosenList({
                                        ...chosenList,
                                        [course]: filteredItems,
                                      });
                                    }
                                  }}
                                />
                                {item.name}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div>
                <p className="mb-4">Selected items</p>

                {Object.keys(chosenList)
                  .filter((course) => chosenList[course].length > 0)
                  .map((course) => {
                    return (
                      <div key={course} className="mb-4">
                        <p className="font-semibold mb-1 capitalize">
                          {course}
                        </p>
                        <div className="border border-b border-gray-200 mb-2"></div>

                        <div className="flex flex-col">
                          <label>
                            <input
                              type="checkbox"
                              name={`${course}-select-all`}
                              className="mb-2"
                              checked={true}
                              onChange={() => {
                                setChosenList({ ...chosenList, [course]: [] });
                              }}
                            />
                            Select All
                          </label>

                          {chosenList[course].map((item) => {
                            return (
                              <label key={item.name} className="capitalize">
                                <input
                                  type="checkbox"
                                  name={`${course}-${item.name}`}
                                  className="mb-2"
                                  checked={true}
                                  onChange={() => {
                                    const filteredItems = chosenList[
                                      course
                                    ].filter((i) => i.name !== item.name);

                                    setChosenList({
                                      ...chosenList,
                                      [course]: filteredItems,
                                    });
                                  }}
                                />
                                {item.name}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <button className="w-full bg-blue-600 py-4 px-8 rounded text-white mt-8">
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
