import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';
import AddTraining from './AddTraining';

export default function Customerlist() {
   const [customers, setCustomers] = useState([]);
   const [open, setOpen] = React.useState(false);

   useEffect(() => fetchData(), []);

   const fetchData = () => {
       fetch('https://customerrest.herokuapp.com/api/customers')
       .then(response => response.json())
       .then(data => setCustomers(data.content))
   }

   const saveCustomer = (customer) => {
      fetch('https://customerrest.herokuapp.com/api/customers', {
         method: 'POST',
         headers: {
              'Content-Type': 'application/json'
         },
         body: JSON.stringify(customer)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
      fetch(link, {
           method: 'PUT',
           headers: {
                'Content-Type': 'application/json'
           },
           body: JSON.stringify(customer)
     })
     .then(res => fetchData())
     .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
      if (window.confirm('Are you sure?')) {
          setOpen(true);
          fetch(link, {method: 'DELETE'})
          .then(res => fetchData())
          .catch(err => console.error(err))
      }
    }

    const addTraining = (training) => {
      fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: {
             'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
     })
     .then(res => fetchData())
     .catch(err => console.error(err))

    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

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
          actions={[
            {
              icon: () => <AddCustomer saveCustomer={saveCustomer}/>,
              tooltip: 'Add Customer',
              isFreeAction: true
            },
            rowData => ({
              icon: () => <EditCustomer updateCustomer={updateCustomer} customer={rowData}/>,
              tooltip: 'Update Customer'
            }),
            rowData => ({
              icon: () => <Button onClick={() => deleteCustomer(rowData.links[0].href)}><DeleteIcon/></Button>,
              tooltip: 'Delete Customer'
            }),
            rowData => ({
              icon: () => <AddTraining addTraining={addTraining} customer={rowData.links[0].href}/>,
              tooltip: 'Add Training'
            })
          ]}
        />
        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Customer deleted"
        />
      </div>
    );
}