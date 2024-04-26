import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ children }) => <div>{children}</div>,
}));

jest.mock('./helpers/helper-functions', () => ({
  postReq: jest.fn(() => Promise.resolve()),
  getReq: jest.fn(() => Promise.resolve({ user: { id: '123', name: 'John' }, status: true })),
  wildReq: jest.fn(() => Promise.resolve()),
  getMovieSByGenre: jest.fn(() => Promise.resolve([{ id: 'movie1', title: 'Movie Title' }])),
}));


const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(<Router>{ui}</Router>, renderOptions);
};

describe('App Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render Home component for unauthenticated users', async () => {
    const { getReq } = require('./helpers/helper-functions');
    getReq.mockImplementationOnce(() => Promise.resolve({ error: true }));

    customRender(<App />, {});

    await waitFor(() => {
      expect(screen.getByText('Not Logged In')).toBeInTheDocument();
    });
  });

  test('authenticated users should see the navigation bar', async () => {
    customRender(<App />, {});

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Genre'));  

    await waitFor(() => {
      expect(screen.getByText('Comedy')).toBeInTheDocument();
      expect(screen.getByText('Romance')).toBeInTheDocument();
      expect(screen.getByText('Horror')).toBeInTheDocument();
    });
  });

  test('handles swipe left to discard a movie', async () => {
    const { postReq } = require('./helpers/helper-functions');
    customRender(<App />, {});

    await waitFor(() => {
      fireEvent.click(screen.getByAltText(''));
    });

    expect(postReq).toHaveBeenCalledWith(
      { title: 'movie1', love: 'n' },
      'users/faves/123'
    );
  });

  test('refresh button triggers refresh action', async () => {
    customRender(<App />, {});

    await waitFor(() => {
      fireEvent.click(screen.getByText('Refresh'));
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

