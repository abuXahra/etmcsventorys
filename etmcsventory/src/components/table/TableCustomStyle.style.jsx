
export const customStyles={
    table: {
      style: {
        width: '100%', // Ensure the table takes up 100% of its container width
        tableLayout: 'auto',
        padding: "0px", // Allow columns to adjust their width based on content
        margin: "0px",
        border: '1px solid #cccccc47',
      },

    },
    head: {
      style: {
        fontWeight: 'bold',
        fontSize: '12px', // Adjust font size if needed
        textAlign: 'center', // Align text in the header cells
        height: "40px",
      }
    },
    headCells: {
      style: {
        whiteSpace: 'normal', // Allow multi-line headers if needed
        fontSize: "12px",
        wordWrap: 'break-word', // Ensure long text wraps within the cell
        fontWeight: 'bold',
        paddingBottom: "4px", // Set padding for header row to 0
        paddingLeft: "20px",    // Set padding for header row to 0
        paddingRight: "0px",   // Set padding for header row to 0
        paddingTop: "4px",    // Set padding for header row to 0
        backgroundColor: '#cccccc47',
        height: "40px",
      },
    },
    cells: {
      style: {
        paddingBottom: "4px",
        paddingLeft: "20px",
        paddingRight: "2px",
        paddingTop: "4px",// Reduce padding for cells
        wordWrap: 'break-word', // Ensure long text wraps within the cell
        whiteSpace: 'normal', // Allow text to wrap inside cells
      },
    },
    rows: {
      style: {
        fontSize: '12px', // Smaller font size for rows
        minHeight: "30px",
      },
    },

    pagination: {
        style: {
          fontSize: '10px', // Adjust font size for pagination controls (including "Rows per page")
        },
      },
  }