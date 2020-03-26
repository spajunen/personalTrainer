import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';

export default function Traininglist() {
   const [trainings, setTrainings] = useState([]);

   useEffect(() => fetchData(), []);

   const fetchData = () => {
       fetch('https://customerrest.herokuapp.com/gettrainings')
       .then(response => response.json())
       .then(data => setTrainings(data))
   }

    return(
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Activity', field: 'activity' },
            { title: 'Date', field: 'date' },
            { title: 'Duration', field: 'duration' },
            { title: 'First name', field: 'customer.firstname'},
            { title: 'Last name', field: 'customer.lastname'}
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