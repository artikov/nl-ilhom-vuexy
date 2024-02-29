import { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import Icon from 'src/@core/components/icon'

import { useDropzone } from 'react-dropzone'

const ProductFileUploadForm = ({ setImage }) => {
  const [files, setFiles] = useState([])

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      // Assuming only one file is being uploaded
      const uploadedFile = acceptedFiles[0]

      // Set the image URL using URL.createObjectURL
      setImage(uploadedFile)

      // Set the file in the state
      setFiles([Object.assign(uploadedFile)])
    }
  })

  const img = files.map(file => (
    <img
      key={file.name}
      alt={file.name}
      className='single-file-image'
      style={{ width: '100%' }}
      src={URL.createObjectURL(file)}
    />
  ))

  return (
    <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 400 } : {}}>
      <input {...getInputProps()} />
      {files.length ? (
        img
      ) : (
        <Box
          sx={{
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '1rem',
            gap: '1rem'
          }}
        >
          <Box
            sx={{
              mb: 1.75,
              width: 48,
              height: 48,
              display: 'flex',
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon icon='tabler:upload' fontSize='1.75rem' />
          </Box>
          <Typography variant='h4' sx={{ mb: 0.5 }}>
            Drop files here or click to upload.
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          <Button variant='tonal' component='label' sx={{ mt: 0.5 }}>
            Upload File
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default ProductFileUploadForm
