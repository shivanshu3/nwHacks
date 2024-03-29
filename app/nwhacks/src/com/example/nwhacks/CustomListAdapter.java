package com.example.nwhacks;

import com.example.nwhacks.R;
import com.example.nwhacks.AppController;

 
import java.util.List;
 
import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;
 
import com.android.volley.toolbox.ImageLoader;
import com.android.volley.toolbox.NetworkImageView;
 
public class CustomListAdapter extends BaseAdapter {
    private Activity activity;
    private LayoutInflater inflater;
    private List<Page> pageItems;
    ImageLoader imageLoader = AppController.getInstance().getImageLoader();
 
    public CustomListAdapter(Activity activity, List<Page> pageList) {
        this.activity = activity;
        this.pageItems = pageList;
    }
 
    @Override
    public int getCount() {
        return pageItems.size();
    }
 
    @Override
    public Object getItem(int location) {
        return pageItems.get(location);
    }
 
    @Override
    public long getItemId(int position) {
        return position;
    }
 
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
 
        if (inflater == null)
            inflater = (LayoutInflater) activity
                    .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        if (convertView == null)
            convertView = inflater.inflate(R.layout.list_row, null);
 
        if (imageLoader == null)
            imageLoader = AppController.getInstance().getImageLoader();
        NetworkImageView thumbNail = (NetworkImageView) convertView
                .findViewById(R.id.thumbnail);
        TextView title = (TextView) convertView.findViewById(R.id.title);
        TextView rating = (TextView) convertView.findViewById(R.id.rating);
 
        // getting movie data for the row
        Page m = pageItems.get(position);
 
        // thumbnail image
        thumbNail.setImageUrl(m.getImageURL(), imageLoader);
         
        // title
        title.setText(m.getName());
         
        // rating
        rating.setText("Rating: " + String.valueOf(m.getNumberOfLikes()));
         
 
        return convertView;
    }
 
}