import { useState } from "react";
import { HiSearch } from "react-icons/hi";

type SearchbarProps = {
  onChange: React.ChangeEventHandler
}

export default function Searchbar(props: SearchbarProps) {
  const [showSearch, setShowSearch] = useState(false);

  return <div className="search items-center">
    {showSearch && <input onChange={props.onChange} className="bg-transparent rounded-md searchbar"/>}
    <button onClick={() => setShowSearch(prevState => !prevState)}>
			<HiSearch className="surface-text" />
    </button>
  </div>
}
