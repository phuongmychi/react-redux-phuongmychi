import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  getAllvideo,
  videoA,
} from "./counterSlice";
import PropTypes from "prop-types";
import { RootState } from "../../app/store";
import styles from "./Counter.module.css";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");
  const data = useAppSelector(videoA);
  console.log(data);

  const incrementValue = Number(incrementAmount) || 0;
  useEffect(() => {
    dispatch(getAllvideo());
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          {data.slice(0, count).map((item: any) => (
            <div className="col-sm-3">
              <figure>
                <a
                  href={
                    `https://phuongmychi.vn/video/watch?id=` +
                    item.snippet.resourceId.videoId
                  }
                >
                  {isEmpty(item.snippet.thumbnails.maxres) === true ? (
                    ""
                  ) : (
                    <img
                      src={item.snippet.thumbnails.maxres.url}
                      className="img-fluid"
                      alt={
                        isEmpty(item.snippet.title) === true
                          ? ""
                          : item.snippet.title
                      }
                    />
                  )}
                </a>
              </figure>
              <p>{item.snippet.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
}
interface IRootState {
  state: RootState;
}
const mapStateToProps = (state: IRootState) => state;
