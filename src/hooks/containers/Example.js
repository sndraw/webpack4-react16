/**
 * Created by sn on 2019/3/25.
 */
import React from 'react';

function Example () {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>You clicked <span id="example-count">{count}</span> times</p>
      <button id="example-button" onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

export  default  Example
