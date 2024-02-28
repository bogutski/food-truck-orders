import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const statuses = ['new', 'cooking', 'ready', 'delivered'];
const initialOrders = [
  { id: 1, name: 'Alex', status: 'new' },
  { id: 2, name: 'Michael', status: 'cooking' },
];


function App() {
  const [name, setName] = useState('');
  const [orders, setOrders] = useState(initialOrders);

  const onAdd = () => {
    setName('');
    const biggestIdInOrders = Math.max(...orders.map((order) => order.id));
    setOrders([
      ...orders,
      {
        id: biggestIdInOrders + 1,
        name: name,
        status: 'new',
      },
    ]);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onOrderClick = (order) => {
    const currentStatus = order.status;
    const nextStatus = statuses[statuses.indexOf(currentStatus) + 1];
    const newOrders = orders.map((o) => {
      if (o.id === order.id) {
        return {
          ...o,
          status: nextStatus
        };
      }
      return o;
    });
    setOrders(newOrders);
  };

  return (
    <div className="p-4">
      <div class="input-group mb-3">
        <input type="text" onChange={onNameChange} value={name}
               class="form-control" />
        <button onClick={onAdd} class="btn btn-primary">Add</button>
      </div>

      <div className="row">

        {statuses.map(status => (
          <div className="col">
            <h3>{status}</h3>
            {orders.filter(order => order.status === status)
              .map(order => (
                <div key={order.id}
                     className="d-flex align-items-center border mb-2"
                     onClick={() => onOrderClick(order)}
                >
                  <div className="h1 me-4">{order.id}</div>
                  <div>{order.name}</div>
                </div>
              ))}
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default App;
