import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.Serializable;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Main1 {

  public static void main(String[] args) throws IOException {

      String directoryName = "C:\\backet";
      String resultFileName = "C:\\backet\\global.txt";

      FilenameFilter txtFilter = (File dir, String name) -> {
          return (new File(dir.getAbsolutePath()+File.separator+name).isDirectory()) || name.toLowerCase().endsWith(".txt");
      };

      List<File> textFileNameList = getFileName(new File(directoryName), new ArrayList<>(), txtFilter);
      Collections.sort(textFileNameList, new SortFileName());
      String resultText = fileWriter(textFileNameList, Charset.forName("cp1251")); //may be "UTF-8" or else
      fileWriter(resultFileName, resultText);

  }

    public static List<File> getFileName(File directory, List<File> fileNameList, FilenameFilter txtFilter) {
        for (File file : directory.listFiles(txtFilter)) {
            if (file.isDirectory()) getFileName(file, fileNameList, txtFilter);
            else fileNameList.add(file);
        }
        return fileNameList;
    }

    public static String fileWriter(List<File> textFileNameList, Charset charset) {
        final StringBuilder allText = new StringBuilder();
        textFileNameList.forEach((file) -> {
            try {
                Files.lines(Paths.get(file.getAbsolutePath()), charset).
                        forEach((t) -> {allText.append(t).append("\r\n");});
            } catch (IOException ex) {
                Logger.getLogger(Main1.class.getName()).log(Level.SEVERE, null, ex);
            }
        });
        return allText.toString();
    }

    public static boolean fileWriter(String fileName, String text) throws IOException {
        try (BufferedOutputStream bof = new BufferedOutputStream(new FileOutputStream(fileName))) {
            bof.write(text.getBytes());
        } catch (IOException e) {
            return false;
        }
        return true;
    }

}

class SortFileName implements Serializable, Comparator<File>{

    private static final long serialVersionUID = -5657490615422814108L;

    @Override
    public int compare(File file1, File file2) {
        return file1.getName().compareTo(file2.getName());
    }

}