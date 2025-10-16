import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

import Home from '../src/screens/Home/Home';
import { AppProvider } from '../src/context/AppContext';

jest.mock('expo-local-authentication', () => ({
  authenticateAsync: jest.fn(() => Promise.resolve({ success: true })),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
}));

describe('Home Screen', () => {
  it('renders input and add button', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AppProvider>
        <Home />
      </AppProvider>,
    );
    await waitFor(() => {
      expect(getByPlaceholderText('Add a todo...')).toBeTruthy();
      expect(getByText('ADD')).toBeTruthy();
    });
  });

  it('adds a new todo', async () => {
    const { getByTestId, getByText, queryByText } = render(
      <AppProvider>
        <Home />
      </AppProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('add-todo-input')).toBeTruthy();
    });

    const input = getByTestId('add-todo-input');

    await act(async () => {
      fireEvent.changeText(input, 'Test todo');
    });

    await act(async () => {
      fireEvent.press(getByText('ADD'));
    });
    await waitFor(() => expect(queryByText('Test todo')).toBeTruthy(), {
      timeout: 3000,
    });
  });

  it('does not add empty todo', async () => {
    const { getByTestId } = render(
      <AppProvider>
        <Home />
      </AppProvider>,
    );
    await waitFor(() => {
      expect(getByTestId('add-todo-button')).toBeTruthy();
    });
    const addButton = getByTestId('add-todo-button');
    expect(addButton).toBeDisabled();
  });

  it('edits a todo', async () => {
    const { getByText, queryByText, getAllByTestId, getByTestId } = render(
      <AppProvider>
        <Home />
      </AppProvider>,
    );
    await waitFor(() => {
      expect(getByTestId('add-todo-input')).toBeTruthy();
    });
    const input = getByTestId('add-todo-input');
    const addButton = getByTestId('add-todo-button');

    await act(async () => {
      fireEvent.changeText(input, 'Edit Me');
    });
    await act(async () => {
      fireEvent.press(getByText('ADD'));
    });
    await waitFor(() => expect(queryByText('Edit Me')).toBeTruthy());

    const selectButtons = getAllByTestId(/select-todo-/);
    const selectButton = selectButtons[0];
    const todoId = selectButton.props.testID.split('-')[2];
    await act(async () => {
      fireEvent.press(selectButton);
    });
    await act(async () => {
      fireEvent.press(getByTestId(`edit-todo-${todoId}`));
    });
    await act(async () => {
      fireEvent.changeText(input, 'Edited todo');
    });
    await act(async () => {
      fireEvent.press(addButton);
    });
    await waitFor(() => expect(queryByText('Edited todo')).toBeTruthy());
  });

  it('deletes a todo', async () => {
    const { getByText, queryByText, getAllByTestId, getByTestId } = render(
      <AppProvider>
        <Home />
      </AppProvider>,
    );
    await waitFor(() => {
      expect(getByTestId('add-todo-input')).toBeTruthy();
    });
    const input = getByTestId('add-todo-input');

    await act(async () => {
      fireEvent.changeText(input, 'Delete Me');
    });
    await act(async () => {
      fireEvent.press(getByText('ADD'));
    });
    await waitFor(() => expect(queryByText('Delete Me')).toBeTruthy());

    const selectButtons = getAllByTestId(/select-todo-/);
    const selectButton = selectButtons[0];
    const todoId = selectButton.props.testID.split('-')[2];
    await act(async () => {
      fireEvent.press(selectButton);
    });
    await act(async () => {
      fireEvent.press(getByTestId(`delete-todo-${todoId}`));
    });
    await waitFor(() => expect(queryByText('Delete Me')).toBeNull());
  });

  it('toggles completed state', async () => {
    const { getByTestId, getByText, queryByText, getAllByTestId } = render(
      <AppProvider>
        <Home />
      </AppProvider>,
    );
    await waitFor(() => {
      expect(getByTestId('add-todo-input')).toBeTruthy();
    });
    const input = getByTestId('add-todo-input');

    await act(async () => {
      fireEvent.changeText(input, 'Complete Me');
    });
    await act(async () => {
      fireEvent.press(getByText('ADD'));
    });
    await waitFor(() => expect(queryByText('Complete Me')).toBeTruthy());

    const selectButtons = getAllByTestId(/select-todo-/);
    const selectButton = selectButtons[0];
    const todoId = selectButton.props.testID.split('-')[2];
    const checkbox = getByTestId(`complete-checkbox-${todoId}`);
    await act(async () => {
      fireEvent(checkbox, 'onValueChange', true);
    });
    await waitFor(() => {
      const todoText = getByText('Complete Me');
      const styleArray = Array.isArray(todoText.props.style)
        ? todoText.props.style
        : [todoText.props.style];
      const hasLineThrough = styleArray.some(
        styleObj => styleObj && styleObj.textDecorationLine === 'line-through',
      );
      expect(hasLineThrough).toBe(true);
    });
  });
});
