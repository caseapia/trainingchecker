import { Tooltip, tooltipClasses, styled, TooltipProps } from '@mui/material';
import Fade from '@mui/material/Fade';

export const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip
      placement='top'
      leaveDelay={100}
      enterDelay={0}
      {...props}
      classes={{ popper: className }}
      slots={{
        transition: Fade,
      }}
      slotProps={{
        transition: { timeout: 300, },
      }}
    />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: 'rgba(32, 32, 32, 0.9)',
      backdropFilter: 'blur(10px)',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'rgba(32, 32, 32, 0.9)',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '13px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      border: '1px solid black',
      fontWeight: 400,
    },
}));

export default BootstrapTooltip;