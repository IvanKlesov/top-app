import { SearchProps } from "./Search.props";
import styles from './Search.module.css';
import cn from 'classnames';
import { Button, Input } from "..";
import { useState } from "react";
import SearchIcon from './search.svg';
import { useRouter } from "next/router";

export const Search = ({className, ...props}: SearchProps): JSX.Element => {
    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    const goToSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search
            }
        });
    };

    const handleKeyDown = (event:React.KeyboardEvent) => {
        if (event.key == 'Enter') {
            goToSearch();
        }
    };

    return (
        <form className={cn(className, styles.search)} {...props} role='search'>
            <Input placeholder='Поиск...' value={search} onChange={(e) => setSearch(e.target.value)} className={styles.input} onKeyDown={handleKeyDown} />
            <Button appearance='primary' className={styles.button} onClick={goToSearch} aria-label='Искать по сайту'>
                <SearchIcon />
            </Button>
        </form>
    );
};