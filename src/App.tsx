import { Component, For, createResource, createSignal } from 'solid-js';
import { debounce } from '@solid-primitives/scheduled';
import { autoAnimate } from 'solid-auto-animate';

interface Item {
  name: string;
}

const fetchUserByName = async (name: string) => {
  if (name) {
    const res = await fetch(`https://swapi.dev/api/people?search=${name}`);
    return await res.json();
  }

  return null;
};

const App: Component = () => {
  autoAnimate;

  const [search, setSearch] = createSignal('');
  const debounceValue = debounce((name: string) => setSearch(name), 250);
  const [list] = createResource(search, fetchUserByName);

  return (
    <div class="root">
      <div class="wrapper">
        <div class="input-wrapper">
          <input
            type="text"
            placeholder="Enter Sentence"
            class="input"
            // onInput={(e: any) => setSearch(e.currentTarget.value)}
            onInput={(e: any) => {
              debounceValue(e.currentTarget.value);
              debounceValue.clear();
            }}
          />
        </div>

        <ul class="list" use:autoAnimate>
          <For each={list()?.results || []}>
            {(item: Item) => {
              const { name } = item;
              return (
                <li>
                  <span class="circle">{name.at(0)}</span>
                  <span class="name">{name}</span>
                </li>
              );
            }}
          </For>
        </ul>
      </div>
    </div>
  );
};

export default App;
