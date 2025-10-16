import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { Todo } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppContextType {
  addTodo: () => void;
  deleteTodo: () => void;
  editTodo: () => void;
  isEditting: boolean;
  selectedTodo: Todo | null;
  setIsEditting: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTodo: (todo: Todo | null) => void;
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  toggleCompleted: (id: number) => void;
  todos: Todo[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [text, setText] = useState('');
  const [isEditting, setIsEditting] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const value = await AsyncStorage.getItem('todos');
        if (value !== null) {
          setTodos(JSON.parse(value));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTodos();
  }, []);

  const storeData = async (value: Todo[]) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo = { id: Date.now(), text, completed: false, selected: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    storeData(updatedTodos);
    setText('');
  };

  const deleteTodo = () => {
    setIsEditting(false);
    setSelectedTodo(null);
    if (selectedTodo) {
      const updatedTodos = todos.filter(todo => todo.id !== selectedTodo.id);
      setTodos(updatedTodos);
      storeData(updatedTodos);
    }
  };

  const editTodo = () => {
    if (selectedTodo) {
      const updatedTodos = todos.map(todo =>
        todo.id === selectedTodo.id ? { ...todo, text } : todo,
      );
      setTodos(updatedTodos);
      storeData(updatedTodos);
    }
    setText('');
    setIsEditting(false);
    setSelectedTodo(null);
  };

  const toggleCompleted = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updatedTodos);
    storeData(updatedTodos);
  };

  return (
    <AppContext.Provider
      value={{
        text,
        setText,
        todos,
        addTodo,
        deleteTodo,
        toggleCompleted,
        editTodo,
        setSelectedTodo,
        selectedTodo,
        isEditting,
        setIsEditting,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
