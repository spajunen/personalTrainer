import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';

export default function Customerlist() {
   const [customers, setCustomers] = useState([]);

   useEffect(() => fetchData(), []);

   const fetchData = () => {
       fetch('https://customerrest.herokuapp.com/api/customers')
       .then(response => response.json())
       .then(data => setCustomers(data.content))
   }

    return(
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'First name', field: 'firstname' },
            { title: 'Last name', field: 'lastname' },
            { title: 'Email', field: 'email' },
            { title: 'Phone', field: 'phone'},
            { title: 'Address', field: 'streetaddress'},
            { title: 'Postcode', field: 'postcode'},
            { title: 'City', field: 'city'}
          ]}
          data={customers}
          title="Customers"
          options={{
            headerStyle: {
              fontWeight: 'bold'
            }
          }}
        />
      </div>
    );
}