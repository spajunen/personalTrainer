import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';

export default function Traininglist() {
   const [trainings, setTrainings] = useState([]);

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
                fullName: `${training.customer.firstname} ${training.customer.lastname}`
              },
            }
          })

          setTrainings(editedData)
        })
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
        />
      </div>
    );
}