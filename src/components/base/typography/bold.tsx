import styled from 'styled-components/native';

const Bold = styled.Text`
  ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.text};
`;

export default Bold;
