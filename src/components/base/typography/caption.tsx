import styled from 'styled-components/native';

type CaptionProps = {
  uppercase?: boolean;
};

const Caption = styled.Text<CaptionProps>`
  ${({ theme }) => theme.fonts.caption};
  ${({ uppercase, theme }) => (uppercase ? (theme.fonts.captionUppercase as any) : '')};
  color: ${({ theme }) => theme.text};
`;

export default Caption;
