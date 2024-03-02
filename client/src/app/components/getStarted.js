import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import LogoImage from '../../../public/pharmacie.png';
import Link from 'next/link';

export default function GetStarted() {
  return (
    <Card
      data-resizable
      sx={{
        textAlign: 'center',
        alignItems: 'center',
        width: 343,
        // to make the demo resizable
        overflow: 'auto',
        resize: 'horizontal',
        '--icon-size': '100px',
        backgroundColor: 'success.main', // Set background color to green
      }}
    >
      <CardOverflow variant="solid" color="success"> {/* Change color prop to "success" */}
        <AspectRatio
          variant="outlined"
          color="success"
          ratio="1"
          sx={{
            m: 'auto',
            transform: 'translateY(50%)',
            borderRadius: '50%',
            width: 'var(--icon-size)',
            boxShadow: 'sm',
            bgcolor: 'background.surface',
            position: 'relative',
          }}
        >
          <div>
            <Image src={LogoImage} alt="Pharmacy Logo" style={{ width: '4rem', height: '4rem' }} /> {/* Replace icon with image */}
          </div>
        </AspectRatio>
      </CardOverflow>
      <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
        Get Started To find pharmacies around you
      </Typography>
      <CardContent sx={{ maxWidth: '40ch' }}>
        Start your journey to convenient healthcare access by using our app to locate pharmacies nearby. With just a few taps, find the closest pharmacies, their operating hours, and contact information. Never be far from essential medications again.
      </CardContent>
      <CardActions
        orientation="vertical"
        buttonFlex={1}
        sx={{
          '--Button-radius': '40px',
          width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
        }}
      >
      <Link href="/login"> {/* Adjust the href to match your route */}
  <Button variant="plain" color="success">
    Get Started
  </Button>
</Link>
       
      </CardActions>
    </Card>
  );
}
