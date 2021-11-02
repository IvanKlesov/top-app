import { RatingProps } from "./Rating.props";
import styles from './Rating.module.css';
import cn from 'classnames';
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from "react";
import StarIcon from './star.svg';


export const Rating = forwardRef(({isEditable = false, rating, error, setRating, tabIndex, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(SVGElement | null)[]>([]);

    const computedFocus = (r: number, i: number): number => {
        if (!isEditable) {
            return -1;
        }
        if (!rating && i == 0) {
            return tabIndex ?? 0;
        }
        if (r == i + 1) {
            return tabIndex ?? 0;
        }
        return -1;

    };

    useEffect(() => {
        constructRating(rating);
    }, [rating, tabIndex]);

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((r: JSX.Element, i:number) => {
            return (
                <StarIcon
                    className={cn(styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}
                    tabIndex={computedFocus(rating, i)}
                    onKeyDown={handleKey}
                    ref={(r: SVGElement | null) => ratingArrayRef.current?.push(r)}
                    role={isEditable ? 'slider' : ''}
                    aria-valuenow={rating}
                    aria-valuemax={5}
                    aria-valuemin={1}
                    aria-invalid={error ? true : false}
                    aria-label={isEditable ? 'Укажите рейтинг стрелками вверх и вниз' : ('рейтинг' + rating)}
                />
            );
        });
        setRatingArray(updatedArray);
    };
    
    const changeDisplay = (i: number) => {
        if (!isEditable) {
            return;
        }
        constructRating(i);
    };

    const onClick = (i: number) => {
        if (!isEditable || !setRating) {
            return;
        }
        setRating(i);
    };

    const handleKey = (e:KeyboardEvent<SVGElement>) => {
        if (!isEditable || !setRating) {
            return;
        }
        if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
            if (!rating) {
                setRating(1);
            } else {
                e.preventDefault();
                setRating(rating < 5 ? rating + 1 : 5);
            }
            ratingArrayRef.current[rating]?.focus();
        }
        if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
            e.preventDefault();
            setRating(rating > 1 ?rating - 1 : 1);
            ratingArrayRef.current[rating - 2]?.focus();
        }
    };

    return (
        <div {...props} ref={ref} className={cn(styles.ratingWrapper, {
            [styles.error]: error
        })}>
            {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
            {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
           
        </div>
    );
});