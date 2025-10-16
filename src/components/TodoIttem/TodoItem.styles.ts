import { StyleSheet } from 'react-native';
import { colors } from '../../colors';

export const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    minHeight: 60,
    borderWidth: 1,
    borderColor: colors.todoItemBorder,
    borderRadius: 4,
    backgroundColor: colors.todoItemBackground,
  },
  todoItemText: {
    flex: 1,
    marginRight: 8,
    marginLeft: 10,
    fontSize: 16,
    color: colors.todoItemText,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: colors.todoItemCompleted,
  },
  editButton: {
    backgroundColor: colors.editButtonBackground,
    color: colors.editButtonText,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: colors.deleteButtonBackground,
    color: colors.deleteButtonText,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  text: {
    color: colors.deleteButtonText,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 6,
  },
});
