import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export default function Traininglist() {
   const [trainings, setTrainings] = useState([]);
   const [open, setOpen] = React.useState(false);

   useEffect(() => fetchData(), []);

   const fetchData = () => {
       fetch('https://customerrest.herokuapp.com/gettrainings')
       .then(response => response.json())
       .then(data => {
         const editedData = data.map(training => {
            return {
              ...training,
              date: moment(training.date).format('MMMM Do YYYY, h:mm a'),
              customer: {
                ...training.customer,
                fullName: training.customer ? `${training.customer.firstname} ${training.customer.lastname}` : ''
              },
            }
          })

          setTrainings(editedData)
        })
   }

   const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const deleteTraining = (id) => {
    if (window.confirm('Are you sure?')) {
        setOpen(true);
        fetch('https://customerrest.herokuapp.com/api/trainings/'+id, {
          method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
  }

    return(
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Activity', field: 'activity' },
            { title: 'Date', field: 'date' },
            { title: 'Duration', field: 'duration' },
            { title: 'Name', field: 'customer.fullName'},
          ]}
          data={trainings}
          title="Trainings"
          options={{
            headerStyle: {
              fontWeight: 'bold'
            }
          }}
          actions={[
            rowData => ({
              icon: () => <Button onClick={() => deleteTraining(rowData.id)}><DeleteIcon/></Button>,
              tooltip: 'Delete Training'
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
          message="Training deleted"
        />
      </div>
    );
}